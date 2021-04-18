using Microsoft.EntityFrameworkCore.Migrations;

namespace EstablishmentService.Migrations
{
    public partial class EstUsrTableAddMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EstablishmentUserEntities",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    EstablishmentId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstablishmentUserEntities", x => new { x.UserId, x.EstablishmentId });
                    table.ForeignKey(
                        name: "FK_EstablishmentUserEntities_Establishments_EstablishmentId",
                        column: x => x.EstablishmentId,
                        principalTable: "Establishments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_EstablishmentUserEntities_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EstablishmentUserEntities_EstablishmentId",
                table: "EstablishmentUserEntities",
                column: "EstablishmentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EstablishmentUserEntities");
        }
    }
}
