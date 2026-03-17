package com.company.accountspayable;


import org.springframework.data.jpa.repository.JpaRepository;

public interface APInvoiceRepository extends JpaRepository<APInvoice, Long> {
    
}