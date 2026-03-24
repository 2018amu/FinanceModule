package com.company.reports;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinancialRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // balancesheet, incomestatement, cashflow, ratios
    private String category; // Assets, Liabilities, Revenue etc.
    private String name; // Cash, Sales, Expenses
    private BigDecimal amount;
}