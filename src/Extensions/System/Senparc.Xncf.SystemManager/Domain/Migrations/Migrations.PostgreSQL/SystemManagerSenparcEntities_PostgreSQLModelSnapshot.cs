﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Senparc.Xncf.SystemManager.Domain.DatabaseModel;

#nullable disable

namespace Senparc.Xncf.SystemManager.Domain.Migrations.Migrations.PostgreSQL
{
    [DbContext(typeof(SystemManagerSenparcEntities_PostgreSQL))]
    partial class SystemManagerSenparcEntities_PostgreSQLModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Senparc.Ncf.Core.Models.SystemConfig", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("AddTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("AdminRemark")
                        .HasMaxLength(300)
                        .HasColumnType("character varying(300)");

                    b.Property<bool>("Flag")
                        .HasColumnType("boolean");

                    b.Property<bool?>("HideModuleManager")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("LastUpdateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("MchId")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("MchKey")
                        .HasMaxLength(300)
                        .HasColumnType("character varying(300)");

                    b.Property<string>("Remark")
                        .HasMaxLength(300)
                        .HasColumnType("character varying(300)");

                    b.Property<string>("SystemName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("TenPayAppId")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<int>("TenantId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("SystemConfigs");
                });
#pragma warning restore 612, 618
        }
    }
}