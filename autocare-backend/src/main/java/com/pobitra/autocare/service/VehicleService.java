package com.pobitra.autocare.service;

import com.pobitra.autocare.dto.VehicleRequestDTO;
import com.pobitra.autocare.dto.VehicleResponseDTO;

import java.util.List;

public interface VehicleService {

    // ==============================
    // CUSTOMER
    // ==============================

    // Add a vehicle for the logged-in customer
    VehicleResponseDTO createVehicle(
            VehicleRequestDTO dto,
            String email);

    // Get all vehicles of the logged-in customer
    List<VehicleResponseDTO> getMyVehicles(
            String email);

    // Update own vehicle
    VehicleResponseDTO updateVehicle(
            Long id,
            VehicleRequestDTO dto,
            String email);

    // Delete own vehicle
    void deleteVehicle(
            Long id,
            String email);

    // ==============================
    // ADMIN / STAFF
    // ==============================

    // View all vehicles
    List<VehicleResponseDTO> getAllVehicles();

    // View vehicle details
    VehicleResponseDTO getVehicleById(Long id);
}