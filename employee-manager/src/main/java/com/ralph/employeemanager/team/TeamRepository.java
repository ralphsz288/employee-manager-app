package com.ralph.employeemanager.team;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends MongoRepository<Team, String> {
    List<Team> findByOwner(String ownerId);
    Team findByNameAndOwner(String name, String owner);
}
