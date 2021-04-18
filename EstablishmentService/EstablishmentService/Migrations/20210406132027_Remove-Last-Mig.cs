using Microsoft.EntityFrameworkCore.Migrations;

namespace EstablishmentService.Migrations
{
    public partial class RemoveLastMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Establishments_EstablishmentEntityId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_EstablishmentEntityId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EstablishmentEntityId",
                table: "Users");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EstablishmentEntityId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_EstablishmentEntityId",
                table: "Users",
                column: "EstablishmentEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Establishments_EstablishmentEntityId",
                table: "Users",
                column: "EstablishmentEntityId",
                principalTable: "Establishments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
