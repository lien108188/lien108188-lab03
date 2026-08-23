# Demo — Spring Boot example

Hướng dẫn nhanh để chạy project này trên Windows.

- Yêu cầu: JDK 21 (hoặc tương thích)

Chạy trong PowerShell (mở 1 cửa sổ mới sau khi đặt `JAVA_HOME` hệ thống nếu cần):

```powershell
Set-Location "D:\Lập trình web Java1\demo"
$env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-21.0.12.101-hotspot"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
.\mvnw.cmd test        # chạy tests
.\mvnw.cmd package     # tạo file ứng dụng
java -jar target\demo-0.0.1-SNAPSHOT.jar
```

Nếu `java` không tìm thấy, cài OpenJDK (ví dụ bằng `winget`):

```powershell
winget install --id Microsoft.OpenJDK.21 -e --accept-package-agreements --accept-source-agreements
```

Sau khi cài, bạn có thể đặt `JAVA_HOME` hệ thống (Admin PowerShell):

```powershell
setx -M JAVA_HOME "C:\Program Files\Microsoft\jdk-21.0.12.101-hotspot"
setx -M PATH "%JAVA_HOME%\\bin;%PATH%"
```
