package com.ralph.employeemanager.team;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TeamRepository extends MongoRepository<Team, String> {
    List<Team> findByOwner(String ownerId);
}
