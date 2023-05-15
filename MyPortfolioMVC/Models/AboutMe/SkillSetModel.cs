using Microsoft.AspNetCore.Mvc;
using System;
using System.ComponentModel.DataAnnotations;

namespace MyPortfolioMVC.Models
{
    public class SkillSetModel
    {
        public string? Name { get; set; }
        public string? IconUrl { get; set; }
    }
}
