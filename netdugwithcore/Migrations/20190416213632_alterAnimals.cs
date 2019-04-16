using Microsoft.EntityFrameworkCore.Migrations;

namespace netdugwithcore.Migrations
{
    public partial class alterAnimals : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Count",
                table: "Animals",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Details",
                table: "Animals",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Count",
                table: "Animals");

            migrationBuilder.DropColumn(
                name: "Details",
                table: "Animals");
        }
    }
}
