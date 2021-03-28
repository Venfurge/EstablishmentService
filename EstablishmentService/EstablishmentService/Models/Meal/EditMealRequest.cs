﻿using System.ComponentModel.DataAnnotations;

namespace EstablishmentService.Models.Meal
{
    public class EditMealRequest
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public int Weight { get; set; }
    }
}
