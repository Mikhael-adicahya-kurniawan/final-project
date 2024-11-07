package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

// Struktur data kamar
type Room struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Image       string `json:"image"`
}

// Struktur data fasilitas
type Facility struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Image       string `json:"image"`
}

// Struktur data booking request
type BookingRequest struct {
	Name         string     `json:"name"`
	Email        string     `json:"email"`
	CheckInDate  string     `json:"checkInDate"`
	CheckOutDate string     `json:"checkOutDate"`
	RoomType     string     `json:"roomType"`
	TotalPrice   float64    `json:"totalPrice"`
	Facilities   []Facility `json:"facilities"` // Menambahkan fasilitas yang dipilih
}

var rooms = []Room{
	{
		ID:          1,
		Name:        "Single Room",
		Description: "A beautiful luxury room with all amenities.",
		Image:       "https://victoriahotel.co.uk/sites/default/files/2022-09/bc-victoria-accom_standard-single-room-301-at-victoria-hotel.jpg",
	},
	{
		ID:          2,
		Name:        "Double Room",
		Description: "A spacious room with great views.",
		Image:       "https://www.pearlhotelnyc.com/hs-fs/hubfs/2.jpg?width=992&height=661&name=2.jpg",
	},
	{
		ID:          3,
		Name:        "Suite Room",
		Description: "A comfortable standard room for budget-conscious guests.",
		Image:       "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080",
	},
}

func main() {
	app := fiber.New()

	// Konfigurasi CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000", // Set origin frontend
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// Endpoint untuk mendapatkan data kamar
	app.Get("/api/rooms", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"rooms": rooms}) // Mengembalikan data kamar dalam format JSON
	})

	// Endpoint untuk mendapatkan data fasilitas
	app.Get("/api/facilities", func(c *fiber.Ctx) error {
		facilities := []Facility{
			{
				ID:          1,
				Name:        "Swimming Pool",
				Description: "Enjoy a relaxing time at our luxurious swimming pool.",
				Image:       "https://images.unsplash.com/photo-1586662044742-32693387a126?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
			{
				ID:          2,
				Name:        "Gym",
				Description: "Stay fit with our state-of-the-art gym facilities.",
				Image:       "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
			{
				ID:          3,
				Name:        "Restaurant & Coffee Shop",
				Description: "Relax and unwind at our full-service restaurant.",
				Image:       "https://images.unsplash.com/photo-1464979681340-bdd28a61699e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
			{
				ID:          4,
				Name:        "Spa",
				Description: "Indulge in our rejuvenating spa treatments designed to relax and refresh your mind and body.",
				Image:       "https://news.azanahotel.com/wp-content/uploads/2023/10/Body-spa-manfaatnya-luar-biasa-scaled.jpg",
			},
			{
				ID:          5,
				Name:        "Free Wi-Fi",
				Description: "Stay connected with our complimentary high-speed Wi-Fi available throughout the hotel.",
				Image:       "https://images.unsplash.com/photo-1600238454024-bc8c1e49caba?q=80&w=1765&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
			{
				ID:          6,
				Name:        "Arcade / Game Room",
				Description: "Enjoy fun and games in our game room equipped with billiards, darts, and board games.",
				Image:       "https://images.unsplash.com/photo-1640301133815-4bec64fca33f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
		}

		return c.JSON(fiber.Map{"facilities": facilities}) // Mengembalikan data fasilitas dalam format JSON
	})

	// Endpoint untuk mengirim booking
	app.Post("/api/book", func(c *fiber.Ctx) error {
		var booking BookingRequest
		if err := c.BodyParser(&booking); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
		}

		// Mencari room yang sesuai dengan RoomType yang dipilih
		var selectedRoom Room
		for _, room := range rooms {
			if room.Name == booking.RoomType {
				selectedRoom = room
				break
			}
		}

		// Simpan data booking ke database atau lakukan proses lain yang diinginkan di sini.
		log.Printf("Booking received: %+v", booking)

		// Mengembalikan informasi booking yang lebih lengkap
		return c.JSON(fiber.Map{
			"message":      "Booking successful",
			"name":         booking.Name,
			"email":        booking.Email,
			"checkInDate":  booking.CheckInDate,
			"checkOutDate": booking.CheckOutDate,
			"roomType":     booking.RoomType,
			"totalPrice":   booking.TotalPrice,
			"roomImage":    selectedRoom.Image, // Menambahkan gambar room yang dipilih
		})
	})

	// Menjalankan server pada port 3001
	log.Fatal(app.Listen(":3001"))
}
