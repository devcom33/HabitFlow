package org.heymouad.focusapp.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.heymouad.focusapp.enums.RoleName;

@Entity
@Data
@Table(name = "app_roles")
public class AppRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private RoleName role;
}
