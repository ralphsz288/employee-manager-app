package com.ralph.employeemanager.leave_request.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@Document
@NoArgsConstructor
public class LeaveRequest {
    @Id
    private String id;
    private LocalDate startDate;
    private LocalDate endDate;
    private String leaveType;
    private String userId;
    private LeaveRequestStatus status;
}
