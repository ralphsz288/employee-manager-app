package com.ralph.employeemanager.leave_request;

import com.ralph.employeemanager.leave_request.model.LeaveRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LeaveRequestRepository extends MongoRepository<LeaveRequest, String> {
}
