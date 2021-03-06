﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace netdugwithcore.Models
{
    public class TodoContext: DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            :base(options)
        {

        }

        public DbSet<Todo> Todos { get; set; }
        public DbSet<Animal> Animals { get; set; }
    }
}
