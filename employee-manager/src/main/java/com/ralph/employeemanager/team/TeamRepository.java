package com.ralph.employeemanager.team;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TeamRepository extends MongoRepository<Team, String> {
    List<Team> findByOwner(String ownerId);
    Team findByNameAndOwner(String name, String owner);
    List<Team> findByMembersContains(String userId);
}
