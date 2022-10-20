using Microsoft.EntityFrameworkCore.Migrations;

namespace Paroo.Migrations
{
    public partial class nillMedia : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_medias_BundleId",
                table: "medias");

            migrationBuilder.AlterColumn<int>(
                name: "BundleId",
                table: "medias",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_medias_BundleId",
                table: "medias",
                column: "BundleId",
                unique: true,
                filter: "[BundleId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_medias_BundleId",
                table: "medias");

            migrationBuilder.AlterColumn<int>(
                name: "BundleId",
                table: "medias",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_medias_BundleId",
                table: "medias",
                column: "BundleId",
                unique: true);
        }
    }
}
