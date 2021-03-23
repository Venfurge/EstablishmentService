using Microsoft.EntityFrameworkCore.Migrations;

namespace EstablishmentService.Migrations
{
    public partial class ImageNullFieldsMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CommentEntity_MealEntity_MealId",
                table: "CommentEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_CommentEntity_Users_UserId",
                table: "CommentEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_EstablishmentEntity_Users_OwnerId",
                table: "EstablishmentEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_ImageEntity_EstablishmentEntity_EstablishmentId",
                table: "ImageEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_ImageEntity_MealEntity_MealId",
                table: "ImageEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_ImageEntity_Users_UserId",
                table: "ImageEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_MealEntity_EstablishmentEntity_EstablishmentEntityId",
                table: "MealEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MealEntity",
                table: "MealEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ImageEntity",
                table: "ImageEntity");

            migrationBuilder.DropIndex(
                name: "IX_ImageEntity_UserId",
                table: "ImageEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EstablishmentEntity",
                table: "EstablishmentEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CommentEntity",
                table: "CommentEntity");

            migrationBuilder.RenameTable(
                name: "MealEntity",
                newName: "Meals");

            migrationBuilder.RenameTable(
                name: "ImageEntity",
                newName: "Images");

            migrationBuilder.RenameTable(
                name: "EstablishmentEntity",
                newName: "Establishments");

            migrationBuilder.RenameTable(
                name: "CommentEntity",
                newName: "Comments");

            migrationBuilder.RenameIndex(
                name: "IX_MealEntity_EstablishmentEntityId",
                table: "Meals",
                newName: "IX_Meals_EstablishmentEntityId");

            migrationBuilder.RenameIndex(
                name: "IX_ImageEntity_MealId",
                table: "Images",
                newName: "IX_Images_MealId");

            migrationBuilder.RenameIndex(
                name: "IX_ImageEntity_EstablishmentId",
                table: "Images",
                newName: "IX_Images_EstablishmentId");

            migrationBuilder.RenameIndex(
                name: "IX_EstablishmentEntity_OwnerId",
                table: "Establishments",
                newName: "IX_Establishments_OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_CommentEntity_UserId",
                table: "Comments",
                newName: "IX_Comments_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_CommentEntity_MealId",
                table: "Comments",
                newName: "IX_Comments_MealId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Images",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "MealId",
                table: "Images",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "EstablishmentId",
                table: "Images",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Meals",
                table: "Meals",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Images",
                table: "Images",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Establishments",
                table: "Establishments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Comments",
                table: "Comments",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Images_UserId",
                table: "Images",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Meals_MealId",
                table: "Comments",
                column: "MealId",
                principalTable: "Meals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Users_UserId",
                table: "Comments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Establishments_Users_OwnerId",
                table: "Establishments",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Establishments_EstablishmentId",
                table: "Images",
                column: "EstablishmentId",
                principalTable: "Establishments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Meals_MealId",
                table: "Images",
                column: "MealId",
                principalTable: "Meals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Users_UserId",
                table: "Images",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_Establishments_EstablishmentEntityId",
                table: "Meals",
                column: "EstablishmentEntityId",
                principalTable: "Establishments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Meals_MealId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Users_UserId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Establishments_Users_OwnerId",
                table: "Establishments");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Establishments_EstablishmentId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Meals_MealId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Users_UserId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Meals_Establishments_EstablishmentEntityId",
                table: "Meals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Meals",
                table: "Meals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Images",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_UserId",
                table: "Images");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Establishments",
                table: "Establishments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Comments",
                table: "Comments");

            migrationBuilder.RenameTable(
                name: "Meals",
                newName: "MealEntity");

            migrationBuilder.RenameTable(
                name: "Images",
                newName: "ImageEntity");

            migrationBuilder.RenameTable(
                name: "Establishments",
                newName: "EstablishmentEntity");

            migrationBuilder.RenameTable(
                name: "Comments",
                newName: "CommentEntity");

            migrationBuilder.RenameIndex(
                name: "IX_Meals_EstablishmentEntityId",
                table: "MealEntity",
                newName: "IX_MealEntity_EstablishmentEntityId");

            migrationBuilder.RenameIndex(
                name: "IX_Images_MealId",
                table: "ImageEntity",
                newName: "IX_ImageEntity_MealId");

            migrationBuilder.RenameIndex(
                name: "IX_Images_EstablishmentId",
                table: "ImageEntity",
                newName: "IX_ImageEntity_EstablishmentId");

            migrationBuilder.RenameIndex(
                name: "IX_Establishments_OwnerId",
                table: "EstablishmentEntity",
                newName: "IX_EstablishmentEntity_OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_UserId",
                table: "CommentEntity",
                newName: "IX_CommentEntity_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_MealId",
                table: "CommentEntity",
                newName: "IX_CommentEntity_MealId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "ImageEntity",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "MealId",
                table: "ImageEntity",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EstablishmentId",
                table: "ImageEntity",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MealEntity",
                table: "MealEntity",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ImageEntity",
                table: "ImageEntity",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EstablishmentEntity",
                table: "EstablishmentEntity",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CommentEntity",
                table: "CommentEntity",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ImageEntity_UserId",
                table: "ImageEntity",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CommentEntity_MealEntity_MealId",
                table: "CommentEntity",
                column: "MealId",
                principalTable: "MealEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CommentEntity_Users_UserId",
                table: "CommentEntity",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EstablishmentEntity_Users_OwnerId",
                table: "EstablishmentEntity",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ImageEntity_EstablishmentEntity_EstablishmentId",
                table: "ImageEntity",
                column: "EstablishmentId",
                principalTable: "EstablishmentEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ImageEntity_MealEntity_MealId",
                table: "ImageEntity",
                column: "MealId",
                principalTable: "MealEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ImageEntity_Users_UserId",
                table: "ImageEntity",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MealEntity_EstablishmentEntity_EstablishmentEntityId",
                table: "MealEntity",
                column: "EstablishmentEntityId",
                principalTable: "EstablishmentEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
