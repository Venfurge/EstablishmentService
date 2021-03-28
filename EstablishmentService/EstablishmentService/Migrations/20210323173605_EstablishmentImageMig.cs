using Microsoft.EntityFrameworkCore.Migrations;

namespace EstablishmentService.Migrations
{
    public partial class EstablishmentImageMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Images_EstablishmentId",
                table: "Images");

            migrationBuilder.CreateIndex(
                name: "IX_Images_EstablishmentId",
                table: "Images",
                column: "EstablishmentId",
                unique: true,
                filter: "[EstablishmentId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Images_EstablishmentId",
                table: "Images");

            migrationBuilder.CreateIndex(
                name: "IX_Images_EstablishmentId",
                table: "Images",
                column: "EstablishmentId");
        }
    }
}
