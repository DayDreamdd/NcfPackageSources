
using Senparc.Ncf.Database.SqlServer;

using Senparc.IntegrationSample;
using Senparc.Xncf.DatabaseToolkit.Domain.Services;
using Senparc.Xncf.SystemCore.Domain.Database;

var builder = WebApplication.CreateBuilder(args);

//��ӣ�ע�ᣩ Ncf ���񣨱��룩
builder.AddNcf<SQLServerDatabaseConfiguration>();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

//Use NCF�����룩
app.UseNcf();

app.UseStaticFiles();

app.UseCookiePolicy();

app.UseRouting();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapRazorPages();
    endpoints.MapControllers();
});
app.Run();
