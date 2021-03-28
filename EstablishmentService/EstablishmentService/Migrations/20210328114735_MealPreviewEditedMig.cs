using Microsoft.EntityFrameworkCore.Migrations;

namespace EstablishmentService.Migrations
{
    public partial class MealPreviewEditedMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Images_MealId",
                table: "Images");

            migrationBuilder.CreateIndex(
                name: "IX_Images_MealId",
                table: "Images",
                column: "MealId",
                unique: true,
                filter: "[MealId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Images_MealId",
                table: "Images");

            migrationBuilder.CreateIndex(
                name: "IX_Images_MealId",
                table: "Images",
                column: "MealId");
        }
    }
}
