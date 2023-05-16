using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace MyPortfolioMVC.Models
{
    public class SkillSetModel
    {
        public string? Name { get; set; }
        public string? IconUrl { get; set; }

        public int DisplayOrder { get; set; }
    }
}
