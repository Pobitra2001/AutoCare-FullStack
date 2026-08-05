package com.pobitra.autocare.controller;
import java.security.Principal;


import com.pobitra.autocare.dto.BookingRequestDTO;
import com.pobitra.autocare.dto.BookingResponseDTO;
import com.pobitra.autocare.enums.BookingStatus;
import com.pobitra.autocare.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")

@Tag(name = "Booking API", description = "Vehicle Service Booking APIs")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @Operation(summary = "Create a new booking")
    @PostMapping
    public ResponseEntity<BookingResponseDTO> createBooking(
            @Valid @RequestBody BookingRequestDTO dto,
            Principal principal) {

        return new ResponseEntity<>(
                bookingService.createBooking(dto, principal.getName()),
                HttpStatus.CREATED);
    }

    @Operation(summary = "Get all bookings")
    @GetMapping
    public ResponseEntity<List<BookingResponseDTO>> getAllBookings() {

        return ResponseEntity.ok(
                bookingService.getAllBookings());
    }

    @Operation(summary = "Get booking by ID")
    @GetMapping("/{id}")
    public ResponseEntity<BookingResponseDTO> getBookingById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                bookingService.getBookingById(id));
    }


    @Operation(summary = "Get logged-in customer's bookings")
    @GetMapping("/my-bookings")
    public ResponseEntity<List<BookingResponseDTO>> getMyBookings(
            Principal principal) {

        return ResponseEntity.ok(
                bookingService.getMyBookings(
                        principal.getName()
                )
        );
    }

    @Operation(summary = "Get bookings by status")
    @GetMapping("/status/{status}")
    public ResponseEntity<List<BookingResponseDTO>> getBookingsByStatus(
            @PathVariable BookingStatus status) {

        return ResponseEntity.ok(
                bookingService.getBookingsByStatus(status));
    }

    @Operation(summary = "Update booking status")
    @PutMapping("/{id}/status")
    public ResponseEntity<BookingResponseDTO> updateBookingStatus(
            @PathVariable Long id,
            @RequestParam BookingStatus status) {

        return ResponseEntity.ok(
                bookingService.updateBookingStatus(id, status));
    }

    @Operation(summary = "Delete My Booking")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBooking(
            @PathVariable Long id,
            Principal principal) {

        bookingService.deleteBooking(
                id,
                principal.getName()
        );

        return ResponseEntity.ok(
                "Booking deleted successfully."
        );
    }
}