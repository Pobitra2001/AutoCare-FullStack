package com.pobitra.autocare.controller;

import com.pobitra.autocare.dto.VehicleRequestDTO;
import com.pobitra.autocare.dto.VehicleResponseDTO;
import com.pobitra.autocare.service.VehicleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@Tag(name = "Vehicle API", description = "Vehicle Management APIs")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    // ===========================================
    // CUSTOMER : ADD VEHICLE
    // ===========================================

    @Operation(summary = "Add Vehicle")
    @PreAuthorize("hasRole('CUSTOMER')")
    @PostMapping
    public ResponseEntity<VehicleResponseDTO> createVehicle(
            @Valid @RequestBody VehicleRequestDTO dto,
            Principal principal) {

        return new ResponseEntity<>(
                vehicleService.createVehicle(
                        dto,
                        principal.getName()
                ),
                HttpStatus.CREATED
        );
    }

    // ===========================================
    // CUSTOMER : MY VEHICLES
    // ===========================================

    @Operation(summary = "Get My Vehicles")
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/my")
    public ResponseEntity<List<VehicleResponseDTO>> getMyVehicles(
            Principal principal) {

        return ResponseEntity.ok(
                vehicleService.getMyVehicles(
                        principal.getName()
                )
        );
    }

    // ===========================================
    // CUSTOMER : MY VEHICLE BY ID
    // ===========================================

    @Operation(summary = "Get My Vehicle By Id")
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/my/{id}")
    public ResponseEntity<VehicleResponseDTO> getMyVehicleById(
            @PathVariable Long id,
            Principal principal) {

        return ResponseEntity.ok(
                vehicleService.getMyVehicleById(
                        id,
                        principal.getName()
                )
        );
    }

    // ===========================================
    // ADMIN / STAFF : ALL VEHICLES
    // ===========================================

    @Operation(summary = "Get All Vehicles")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping
    public ResponseEntity<List<VehicleResponseDTO>> getAllVehicles() {

        return ResponseEntity.ok(
                vehicleService.getAllVehicles()
        );
    }

    // ===========================================
    // ADMIN / STAFF : VEHICLE BY ID
    // ===========================================

    @Operation(summary = "Get Vehicle By Id")
    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/{id}")
    public ResponseEntity<VehicleResponseDTO> getVehicleById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                vehicleService.getVehicleById(id)
        );
    }

    // ===========================================
    // CUSTOMER : UPDATE VEHICLE
    // ===========================================

    @Operation(summary = "Update Vehicle")
    @PreAuthorize("hasRole('CUSTOMER')")
    @PutMapping("/{id}")
    public ResponseEntity<VehicleResponseDTO> updateVehicle(
            @PathVariable Long id,
            @Valid @RequestBody VehicleRequestDTO dto,
            Principal principal) {

        return ResponseEntity.ok(
                vehicleService.updateVehicle(
                        id,
                        dto,
                        principal.getName()
                )
        );
    }

    // ===========================================
    // CUSTOMER : DELETE VEHICLE
    // ===========================================

    @Operation(summary = "Delete Vehicle")
    @PreAuthorize("hasRole('CUSTOMER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVehicle(
            @PathVariable Long id,
            Principal principal) {

        vehicleService.deleteVehicle(
                id,
                principal.getName()
        );

        return ResponseEntity.ok(
                "Vehicle deleted successfully."
        );
    }
}