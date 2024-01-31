package com.ralph.employeemanager.confirmation_token;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface ConfirmationTokenRepository extends MongoRepository<ConfirmationToken, String> {
    Optional<ConfirmationToken> findByToken(String token);
}
