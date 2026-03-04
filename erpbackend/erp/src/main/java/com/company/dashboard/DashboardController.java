package com.company.dashboard;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;




@RestController
@RequestMapping("/api/dashboard")
// Enable Angular frontend (or any frontend) to call this API
@CrossOrigin(origins = "http://localhost:4200")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    // PUT: /api/dashboard/pending-actions
    @PutMapping("/pending-actions")
    public ResponseEntity<List<DashboardData.PendingAction>> updatePendingActions(@RequestBody List<DashboardData.PendingAction> actions) {
        // Delegate to service to save actions
        List<DashboardData.PendingAction> updatedActions = dashboardService.updatePendingActions(actions);

        // Return updated list
        return ResponseEntity.ok(updatedActions);
    }

    // GET: /api/dashboard
    @GetMapping
    public ResponseEntity<DashboardData> getDashboard() {
        DashboardData data = dashboardService.getDashboardData();
        return ResponseEntity.ok(data);
    }
}