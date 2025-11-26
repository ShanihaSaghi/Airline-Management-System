// Check authentication
if (sessionStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'login.html';
}

// Sample Data
let flights = [
    { id: 'AI101', from: 'Delhi', to: 'Mumbai', date: '2025-11-27', time: '06:00', price: '₹4,500', seats: 45 },
    { id: 'AI202', from: 'Mumbai', to: 'Bangalore', date: '2025-11-27', time: '09:30', price: '₹5,200', seats: 32 },
    { id: 'AI303', from: 'Delhi', to: 'Kolkata', date: '2025-11-28', time: '11:00', price: '₹4,800', seats: 28 },
    { id: 'AI404', from: 'Bangalore', to: 'Chennai', date: '2025-11-28', time: '14:30', price: '₹3,900', seats: 50 },
    { id: 'AI505', from: 'Chennai', to: 'Hyderabad', date: '2025-11-29', time: '16:00', price: '₹4,100', seats: 38 },
    { id: 'AI606', from: 'Mumbai', to: 'Goa', date: '2025-11-29', time: '18:30', price: '₹3,500', seats: 42 },
    { id: 'AI707', from: 'Kolkata', to: 'Delhi', date: '2025-11-30', time: '07:30', price: '₹4,900', seats: 35 },
    { id: 'AI808', from: 'Hyderabad', to: 'Mumbai', date: '2025-11-30', time: '12:00', price: '₹4,300', seats: 40 }
];

let customers = [
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@email.com', phone: '+91 9876543210', passport: 'J1234567' },
    { id: 2, name: 'Priya Sharma', email: 'priya@email.com', phone: '+91 9876543211', passport: 'K2345678' },
    { id: 3, name: 'Amit Patel', email: 'amit@email.com', phone: '+91 9876543212', passport: 'L3456789' },
    { id: 4, name: 'Sneha Singh', email: 'sneha@email.com', phone: '+91 9876543213', passport: 'M4567890' }
];

let bookings = [
    { id: 'BK001', flightId: 'AI101', customerId: 1, customerName: 'Rajesh Kumar', date: '2025-11-27', status: 'Confirmed', passengers: 2 },
    { id: 'BK002', flightId: 'AI202', customerId: 2, customerName: 'Priya Sharma', date: '2025-11-27', status: 'Confirmed', passengers: 1 },
    { id: 'BK003', flightId: 'AI303', customerId: 3, customerName: 'Amit Patel', date: '2025-11-28', status: 'Confirmed', passengers: 3 }
];

let cancelledBookings = [
    { id: 'BK999', flightId: 'AI101', customerName: 'John Doe', cancelDate: '2025-11-20', reason: 'Personal Reasons', refundStatus: 'Processed' }
];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadFlights();
    loadCustomers();
    loadJourneyDetails();
    loadCancelledBookings();
    populateBookingDropdowns();
    setupEventListeners();
});

// Navigation
function showSection(sectionId) {
    // Remove active class from all sections and nav items
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to selected section
    document.getElementById(sectionId).classList.add('active');
    event.target.closest('.nav-item').classList.add('active');
}

// Toggle sidebar for mobile
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

// Load Flights
function loadFlights() {
    const tbody = document.getElementById('flightsTableBody');
    tbody.innerHTML = '';
    
    flights.forEach(flight => {
        const row = `
            <tr>
                <td>${flight.id}</td>
                <td>${flight.from}</td>
                <td>${flight.to}</td>
                <td>${flight.date}</td>
                <td>${flight.time}</td>
                <td>${flight.price}</td>
                <td>${flight.seats}</td>
                <td>
                    <button class="btn-action btn-edit" onclick="editFlight('${flight.id}')">Edit</button>
                    <button class="btn-action btn-delete" onclick="deleteFlight('${flight.id}')">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Filter Flights
function filterFlights() {
    const source = document.getElementById('sourceFilter').value.toLowerCase();
    const destination = document.getElementById('destinationFilter').value.toLowerCase();
    const date = document.getElementById('dateFilter').value;
    const time = document.getElementById('timeFilter').value;
    
    const filtered = flights.filter(flight => {
        return (!source || flight.from.toLowerCase().includes(source)) &&
               (!destination || flight.to.toLowerCase().includes(destination)) &&
               (!date || flight.date === date) &&
               (!time || flight.time === time);
    });
    
    const tbody = document.getElementById('flightsTableBody');
    tbody.innerHTML = '';
    
    filtered.forEach(flight => {
        const row = `
            <tr>
                <td>${flight.id}</td>
                <td>${flight.from}</td>
                <td>${flight.to}</td>
                <td>${flight.date}</td>
                <td>${flight.time}</td>
                <td>${flight.price}</td>
                <td>${flight.seats}</td>
                <td>
                    <button class="btn-action btn-edit" onclick="editFlight('${flight.id}')">Edit</button>
                    <button class="btn-action btn-delete" onclick="deleteFlight('${flight.id}')">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function resetFilters() {
    document.getElementById('sourceFilter').value = '';
    document.getElementById('destinationFilter').value = '';
    document.getElementById('dateFilter').value = '';
    document.getElementById('timeFilter').value = '';
    loadFlights();
}

// Search functionality
function searchData() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    
    if (!query) {
        loadFlights();
        return;
    }
    
    const filtered = flights.filter(flight => {
        return flight.id.toLowerCase().includes(query) ||
               flight.from.toLowerCase().includes(query) ||
               flight.to.toLowerCase().includes(query);
    });
    
    const tbody = document.getElementById('flightsTableBody');
    tbody.innerHTML = '';
    
    filtered.forEach(flight => {
        const row = `
            <tr>
                <td>${flight.id}</td>
                <td>${flight.from}</td>
                <td>${flight.to}</td>
                <td>${flight.date}</td>
                <td>${flight.time}</td>
                <td>${flight.price}</td>
                <td>${flight.seats}</td>
                <td>
                    <button class="btn-action btn-edit">Edit</button>
                    <button class="btn-action btn-delete">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Load Customers
function loadCustomers() {
    const tbody = document.getElementById('customersTableBody');
    tbody.innerHTML = '';
    
    customers.forEach(customer => {
        const row = `
            <tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>${customer.passport}</td>
                <td>
                    <button class="btn-action btn-edit" onclick="editCustomer(${customer.id})">Edit</button>
                    <button class="btn-action btn-delete" onclick="deleteCustomer(${customer.id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Load Journey Details
function loadJourneyDetails() {
    const tbody = document.getElementById('journeyTableBody');
    tbody.innerHTML = '';
    
    bookings.forEach(booking => {
        const flight = flights.find(f => f.id === booking.flightId);
        if (flight) {
            const row = `
                <tr>
                    <td>${booking.id}</td>
                    <td>${booking.flightId}</td>
                    <td>${booking.customerName}</td>
                    <td>${flight.from}</td>
                    <td>${flight.to}</td>
                    <td>${flight.date}</td>
                    <td>${flight.time}</td>
                    <td><span class="status-badge status-confirmed">${booking.status}</span></td>
                    <td>
                        <button class="btn-action btn-edit">View Details</button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        }
    });
}

// Load Cancelled Bookings
function loadCancelledBookings() {
    const tbody = document.getElementById('cancelledTableBody');
    tbody.innerHTML = '';
    
    cancelledBookings.forEach(booking => {
        const row = `
            <tr>
                <td>${booking.id}</td>
                <td>${booking.flightId}</td>
                <td>${booking.customerName}</td>
                <td>${booking.cancelDate}</td>
                <td>${booking.reason}</td>
                <td><span class="status-badge status-confirmed">${booking.refundStatus}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Populate Booking Dropdowns
function populateBookingDropdowns() {
    const flightSelect = document.getElementById('bookingFlightId');
    const customerSelect = document.getElementById('bookingCustomerId');
    
    flightSelect.innerHTML = '<option value="">Choose a flight</option>';
    customerSelect.innerHTML = '<option value="">Choose a customer</option>';
    
    flights.forEach(flight => {
        flightSelect.innerHTML += `<option value="${flight.id}">${flight.id} - ${flight.from} to ${flight.to} (${flight.date})</option>`;
    });
    
    customers.forEach(customer => {
        customerSelect.innerHTML += `<option value="${customer.id}">${customer.name}</option>`;
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Booking Form
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const flightId = document.getElementById('bookingFlightId').value;
        const customerId = document.getElementById('bookingCustomerId').value;
        const passengers = document.getElementById('passengerCount').value;
        
        const customer = customers.find(c => c.id == customerId);
        const flight = flights.find(f => f.id === flightId);
        
        if (customer && flight) {
            const newBooking = {
                id: 'BK' + String(bookings.length + 1).padStart(3, '0'),
                flightId: flightId,
                customerId: customerId,
                customerName: customer.name,
                date: flight.date,
                status: 'Confirmed',
                passengers: parseInt(passengers)
            };
            
            bookings.push(newBooking);
            
            // Update available seats
            flight.seats -= parseInt(passengers);
            
            alert('Booking confirmed successfully!');
            loadJourneyDetails();
            loadFlights();
            this.reset();
        }
    });
    
    // Cancellation Form
    document.getElementById('cancellationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const bookingId = document.getElementById('cancelBookingId').value;
        const reason = document.getElementById('cancelReason').value;
        
        const bookingIndex = bookings.findIndex(b => b.id === bookingId);
        
        if (bookingIndex !== -1) {
            const booking = bookings[bookingIndex];
            const flight = flights.find(f => f.id === booking.flightId);
            
            // Restore seats
            if (flight) {
                flight.seats += booking.passengers;
            }
            
            // Move to cancelled bookings
            cancelledBookings.push({
                id: booking.id,
                flightId: booking.flightId,
                customerName: booking.customerName,
                cancelDate: new Date().toISOString().split('T')[0],
                reason: reason,
                refundStatus: 'Pending'
            });
            
            // Remove from active bookings
            bookings.splice(bookingIndex, 1);
            
            alert('Booking cancelled successfully!');
            loadJourneyDetails();
            loadCancelledBookings();
            loadFlights();
            this.reset();
        } else {
            alert('Booking ID not found!');
        }
    });
    
    // Add Flight Form
    document.getElementById('addFlightForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newFlight = {
            id: document.getElementById('newFlightId').value,
            from: document.getElementById('newFlightSource').value,
            to: document.getElementById('newFlightDestination').value,
            date: document.getElementById('newFlightDate').value,
            time: document.getElementById('newFlightTime').value,
            price: document.getElementById('newFlightPrice').value,
            seats: parseInt(document.getElementById('newFlightSeats').value)
        };
        
        flights.push(newFlight);
        loadFlights();
        populateBookingDropdowns();
        closeModal('addFlightModal');
        this.reset();
        alert('Flight added successfully!');
    });
    
    // Add Customer Form
    document.getElementById('addCustomerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newCustomer = {
            id: customers.length + 1,
            name: document.getElementById('newCustomerName').value,
            email: document.getElementById('newCustomerEmail').value,
            phone: document.getElementById('newCustomerPhone').value,
            passport: document.getElementById('newCustomerPassport').value
        };
        
        customers.push(newCustomer);
        loadCustomers();
        populateBookingDropdowns();
        closeModal('addCustomerModal');
        this.reset();
        alert('Customer added successfully!');
    });
}

// Modal Functions
function showAddFlightModal() {
    document.getElementById('addFlightModal').classList.add('active');
}

function showAddCustomerModal() {
    document.getElementById('addCustomerModal').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Edit and Delete Functions
function editFlight(id) {
    alert('Edit functionality for flight ' + id);
}

function deleteFlight(id) {
    if (confirm('Are you sure you want to delete this flight?')) {
        flights = flights.filter(f => f.id !== id);
        loadFlights();
        populateBookingDropdowns();
        alert('Flight deleted successfully!');
    }
}

function editCustomer(id) {
    alert('Edit functionality for customer ' + id);
}

function deleteCustomer(id) {
    if (confirm('Are you sure you want to delete this customer?')) {
        customers = customers.filter(c => c.id !== id);
        loadCustomers();
        populateBookingDropdowns();
        alert('Customer deleted successfully!');
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
}