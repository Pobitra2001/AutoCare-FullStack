package com.pobitra.autocare.service;

import com.pobitra.autocare.dto.BookingRequestDTO;
import com.pobitra.autocare.dto.BookingResponseDTO;
import com.pobitra.autocare.enums.BookingStatus;

import java.util.List;

public interface BookingService {

    BookingResponseDTO createBooking(
            BookingRequestDTO dto,
            String email
    );

    List<BookingResponseDTO> getAllBookings();

    BookingResponseDTO getBookingById(Long id);

    List<BookingResponseDTO> getMyBookings(
            String email
    );

    List<BookingResponseDTO> getBookingsByEmail(
            String email
    );

    List<BookingResponseDTO> getBookingsByStatus(
            BookingStatus status
    );

    BookingResponseDTO updateBookingStatus(
            Long id,
            BookingStatus status
    );

    void deleteBooking(
            Long id,
            String email
    );
}