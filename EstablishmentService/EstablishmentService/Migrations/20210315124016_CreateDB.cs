using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EstablishmentService.Migrations
{
    public partial class CreateDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SecondName",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "EstablishmentEntity",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    OwnerId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EstablishmentEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EstablishmentEntity_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MealEntity",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Price = table.Column<double>(nullable: false),
                    Weight = table.Column<int>(nullable: false),
                    EstablishmentEntityId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MealEntity_EstablishmentEntity_EstablishmentEntityId",
                        column: x => x.EstablishmentEntityId,
                        principalTable: "EstablishmentEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CommentEntity",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(nullable: false),
                    Text = table.Column<string>(nullable: true),
                    Mark = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    MealId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommentEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommentEntity_MealEntity_MealId",
                        column: x => x.MealId,
                        principalTable: "MealEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CommentEntity_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ImageEntity",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Link = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false),
                    EstablishmentId = table.Column<int>(nullable: false),
                    MealId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ImageEntity_EstablishmentEntity_EstablishmentId",
                        column: x => x.EstablishmentId,
                        principalTable: "EstablishmentEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ImageEntity_MealEntity_MealId",
                        column: x => x.MealId,
                        principalTable: "MealEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ImageEntity_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CommentEntity_MealId",
                table: "CommentEntity",
                column: "MealId");

            migrationBuilder.CreateIndex(
                name: "IX_CommentEntity_UserId",
                table: "CommentEntity",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_EstablishmentEntity_OwnerId",
                table: "EstablishmentEntity",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_ImageEntity_EstablishmentId",
                table: "ImageEntity",
                column: "EstablishmentId");

            migrationBuilder.CreateIndex(
                name: "IX_ImageEntity_MealId",
                table: "ImageEntity",
                column: "MealId");

            migrationBuilder.CreateIndex(
                name: "IX_ImageEntity_UserId",
                table: "ImageEntity",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MealEntity_EstablishmentEntityId",
                table: "MealEntity",
                column: "EstablishmentEntityId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CommentEntity");

            migrationBuilder.DropTable(
                name: "ImageEntity");

            migrationBuilder.DropTable(
                name: "MealEntity");

            migrationBuilder.DropTable(
                name: "EstablishmentEntity");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SecondName",
                table: "Users");
        }
    }
}
