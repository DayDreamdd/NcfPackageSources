﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Senparc.Xncf.AIKernel.Models;

#nullable disable

namespace Senparc.Xncf.AIKernel.Domain.Migrations.Migrations.Sqlite
{
    [DbContext(typeof(AIKernelSenparcEntities_Sqlite))]
    [Migration("20240104074811_ModifyOrgId")]
    partial class ModifyOrgId
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.0");

            modelBuilder.Entity("Senparc.Xncf.AIKernel.Models.AIModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("AddTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("AdminRemark")
                        .HasMaxLength(300)
                        .HasColumnType("TEXT");

                    b.Property<int>("AiPlatform")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Alias")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.Property<string>("ApiKey")
                        .HasMaxLength(200)
                        .HasColumnType("TEXT");

                    b.Property<string>("ApiVersion")
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<string>("DeploymentName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<string>("Endpoint")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("TEXT");

                    b.Property<bool>("Flag")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsShared")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("LastUpdateTime")
                        .HasColumnType("TEXT");

                    b.Property<int>("MaxToken")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Note")
                        .HasColumnType("TEXT");

                    b.Property<string>("OrganizationId")
                        .HasMaxLength(200)
                        .HasColumnType("TEXT");

                    b.Property<string>("Remark")
                        .HasMaxLength(300)
                        .HasColumnType("TEXT");

                    b.Property<bool>("Show")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TenantId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Senparc_AIKernel_AIModel");
                });
#pragma warning restore 612, 618
        }
    }
}
