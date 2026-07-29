package com.pobitra.autocare.service.impl;

import com.pobitra.autocare.dto.VehicleRequestDTO;
import com.pobitra.autocare.dto.VehicleResponseDTO;
import com.pobitra.autocare.entity.Customer;
import com.pobitra.autocare.entity.User;
import com.pobitra.autocare.entity.Vehicle;
import com.pobitra.autocare.exception.DuplicateResourceException;
import com.pobitra.autocare.exception.ResourceNotFoundException;
import com.pobitra.autocare.repository.CustomerRepository;
import com.pobitra.autocare.repository.UserRepository;
import com.pobitra.autocare.repository.VehicleRepository;
import com.pobitra.autocare.service.VehicleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;

    public VehicleServiceImpl(
            VehicleRepository vehicleRepository,
            CustomerRepository customerRepository,
            UserRepository userRepository) {

        this.vehicleRepository = vehicleRepository;
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
    }

    // ===========================================
    // CUSTOMER : CREATE VEHICLE
    // ===========================================

    @Override
    public VehicleResponseDTO createVehicle(
            VehicleRequestDTO dto,
            String email) {

        if (vehicleRepository.existsByVehicleNumber(dto.getVehicleNumber())) {
            throw new DuplicateResourceException(
                    "Vehicle number already exists.");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found."));

        Customer customer = customerRepository.findByEmail(user.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found."));

        Vehicle vehicle = new Vehicle();

        vehicle.setVehicleNumber(dto.getVehicleNumber());
        vehicle.setBrand(dto.getBrand());
        vehicle.setModel(dto.getModel());
        vehicle.setColor(dto.getColor());
        vehicle.setVehicleType(dto.getVehicleType());
        vehicle.setFuelType(dto.getFuelType());
        vehicle.setManufacturingYear(dto.getManufacturingYear());
        vehicle.setCustomer(customer);

        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        return mapToDTO(savedVehicle);
    }

    // ===========================================
    // CUSTOMER : MY VEHICLES
    // ===========================================

    @Override
    public List<VehicleResponseDTO> getMyVehicles(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found."));

        Customer customer = customerRepository.findByEmail(user.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found."));

        return vehicleRepository.findByCustomerId(customer.getId())
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    // ===========================================
    // ADMIN / STAFF
    // ===========================================

    @Override
    public List<VehicleResponseDTO> getAllVehicles() {

        return vehicleRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public VehicleResponseDTO getVehicleById(Long id) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found."));

        return mapToDTO(vehicle);
    }
    // ===========================================
    // CUSTOMER : UPDATE VEHICLE
    // ===========================================

    @Override
    public VehicleResponseDTO updateVehicle(
            Long id,
            VehicleRequestDTO dto,
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found."));

        Customer customer = customerRepository.findByEmail(user.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found."));

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found."));

        // Customer can update only his own vehicle
        if (!vehicle.getCustomer().getId().equals(customer.getId())) {
            throw new ResourceNotFoundException(
                    "Vehicle not found.");
        }

        vehicle.setVehicleNumber(dto.getVehicleNumber());
        vehicle.setBrand(dto.getBrand());
        vehicle.setModel(dto.getModel());
        vehicle.setColor(dto.getColor());
        vehicle.setVehicleType(dto.getVehicleType());
        vehicle.setFuelType(dto.getFuelType());
        vehicle.setManufacturingYear(dto.getManufacturingYear());

        Vehicle updatedVehicle = vehicleRepository.save(vehicle);

        return mapToDTO(updatedVehicle);
    }

    // ===========================================
    // CUSTOMER : DELETE VEHICLE
    // ===========================================

    @Override
    public void deleteVehicle(
            Long id,
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found."));

        Customer customer = customerRepository.findByEmail(user.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found."));

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found."));

        // Customer can delete only his own vehicle
        if (!vehicle.getCustomer().getId().equals(customer.getId())) {
            throw new ResourceNotFoundException(
                    "Vehicle not found.");
        }

        vehicleRepository.delete(vehicle);
    }

    // ===========================================
    // ENTITY -> DTO
    // ===========================================

    private VehicleResponseDTO mapToDTO(Vehicle vehicle) {

        VehicleResponseDTO dto = new VehicleResponseDTO();

        dto.setId(vehicle.getId());
        dto.setVehicleNumber(vehicle.getVehicleNumber());
        dto.setBrand(vehicle.getBrand());
        dto.setModel(vehicle.getModel());
        dto.setColor(vehicle.getColor());
        dto.setVehicleType(vehicle.getVehicleType());
        dto.setFuelType(vehicle.getFuelType());
        dto.setManufacturingYear(vehicle.getManufacturingYear());

        dto.setCustomerId(vehicle.getCustomer().getId());
        dto.setCustomerName(vehicle.getCustomer().getName());

        return dto;
    }
}