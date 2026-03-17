package com.company.accountsreceivable;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface ARInvoiceRepository extends JpaRepository<ARInvoice, Long> {
    List<ARInvoice> findByStatus(String status);
}