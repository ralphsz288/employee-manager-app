package com.ralph.employeemanager.team;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
@NoArgsConstructor
public class Team {
    @Id
    private String id;
    private String name;
    private String owner;
    private List<String> members;
}
