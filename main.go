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

func main() {
	app := fiber.New()

	// Konfigurasi CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000", // Set origin frontend
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// Endpoint untuk mendapatkan data kamar
	app.Get("/api/rooms", func(c *fiber.Ctx) error {
		// Contoh data kamar
		rooms := []Room{
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

		return c.JSON(fiber.Map{"rooms": rooms}) // Mengembalikan data kamar dalam format JSON
	})

	// Endpoint untuk mendapatkan data fasilitas
	app.Get("/api/facilities", func(c *fiber.Ctx) error {
		// Contoh data fasilitas
		facilities := []Facility{
			{
				ID:          1,
				Name:        "Swimming Pool",
				Description: "Enjoy a relaxing time at our luxurious swimming pool.",
				Image:       "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080",
			},
			{
				ID:          2,
				Name:        "Gym",
				Description: "Stay fit with our state-of-the-art gym facilities.",
				Image:       "https://asset.olympicfurniture.co.id/NEWS/10-Desain-Kamar-Aesthetic-Minimalis-yang-Bikin-Betah.webp",
			},
			{
				ID:          3,
				Name:        "Spa",
				Description: "Relax and unwind at our full-service spa.",
				Image:       "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080",
			},
		}

		return c.JSON(fiber.Map{"facilities": facilities}) // Mengembalikan data fasilitas dalam format JSON
	})

	// Menjalankan server pada port 3001
	log.Fatal(app.Listen(":3001"))
}
