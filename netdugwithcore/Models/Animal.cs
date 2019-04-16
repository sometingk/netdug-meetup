using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace netdugwithcore.Models
{
    public class Animal
    {
        [Key]
        public int id { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
        public int Count { get; set; }
    }
}
