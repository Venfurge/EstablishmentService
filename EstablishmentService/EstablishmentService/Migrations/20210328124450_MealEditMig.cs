using Microsoft.EntityFrameworkCore.Migrations;

namespace EstablishmentService.Migrations
{
    public partial class MealEditMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meals_Establishments_EstablishmentEntityId",
                table: "Meals");

            migrationBuilder.DropIndex(
                name: "IX_Meals_EstablishmentEntityId",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "EstablishmentEntityId",
                table: "Meals");

            migrationBuilder.AddColumn<int>(
                name: "EstablishmentId",
                table: "Meals",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Meals_EstablishmentId",
                table: "Meals",
                column: "EstablishmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_Establishments_EstablishmentId",
                table: "Meals",
                column: "EstablishmentId",
                principalTable: "Establishments",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meals_Establishments_EstablishmentId",
                table: "Meals");

            migrationBuilder.DropIndex(
                name: "IX_Meals_EstablishmentId",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "EstablishmentId",
                table: "Meals");

            migrationBuilder.AddColumn<int>(
                name: "EstablishmentEntityId",
                table: "Meals",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Meals_EstablishmentEntityId",
                table: "Meals",
                column: "EstablishmentEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_Establishments_EstablishmentEntityId",
                table: "Meals",
                column: "EstablishmentEntityId",
                principalTable: "Establishments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
