using Microsoft.EntityFrameworkCore.Migrations;

namespace Paroo.Migrations
{
    public partial class bundleade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BundleId",
                table: "medias",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "banner",
                table: "bundles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_medias_BundleId",
                table: "medias",
                column: "BundleId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_medias_bundles_BundleId",
                table: "medias",
                column: "BundleId",
                principalTable: "bundles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_medias_bundles_BundleId",
                table: "medias");

            migrationBuilder.DropIndex(
                name: "IX_medias_BundleId",
                table: "medias");

            migrationBuilder.DropColumn(
                name: "BundleId",
                table: "medias");

            migrationBuilder.DropColumn(
                name: "banner",
                table: "bundles");
        }
    }
}
