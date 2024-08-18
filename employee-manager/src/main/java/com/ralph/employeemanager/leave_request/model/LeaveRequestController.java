package com.ralph.employeemanager.leave_request.model;

import com.ralph.employeemanager.leave_request.model.dto.NewLeaveRequestDto;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("employee.management/leave-request")
@AllArgsConstructor
public class LeaveRequestController {
    @PostMapping("/new")
    public ResponseEntity<Boolean> newRequest(
            @Valid
            @RequestBody NewLeaveRequestDto newLeaveRequestDto,
            @RequestHeader("Authorization") String authorizationHeader) {
        //needs implementation
        return ResponseEntity.status(HttpStatus.OK).body(true);
    }
}
