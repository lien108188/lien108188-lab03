let studentsData = [];

document.addEventListener("DOMContentLoaded", () => {
    loadStudents();

    // Lắng nghe sự kiện Submit Form Modal
    const modalForm = document.getElementById("modalStudentForm");
    if (modalForm) {
        modalForm.addEventListener("submit", handleSaveStudent);
    }
});

// 1. Gọi API lấy danh sách
async function loadStudents() {
    try {
        const response = await fetch("http://localhost:8080/api/students");
        if (response.ok) {
            studentsData = await response.json();
            renderStudents(studentsData);
        } else {
            console.error("Không tải được danh sách sinh viên");
            document.getElementById("studentTableBody").innerHTML = 
                `<tr><td colspan="6" class="text-center text-danger">Không tải được dữ liệu từ máy chủ!</td></tr>`;
        }
    } catch (error) {
        console.error("Lỗi kết nối:", error);
        document.getElementById("studentTableBody").innerHTML = 
            `<tr><td colspan="6" class="text-center text-danger">Lỗi kết nối tới máy chủ!</td></tr>`;
    }
}

// 2. Render danh sách ra bảng
function renderStudents(students) {
    const tbody = document.getElementById("studentTableBody");
    tbody.innerHTML = "";

    if (!students || students.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center">Chưa có sinh viên nào</td></tr>`;
        return;
    }

    students.forEach(student => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${student.studentCode || ''}</td>
            <td>${student.fullName || ''}</td>
            <td>${student.email || ''}</td>
            <td>${student.phone || ''}</td>
            <td>${student.className || ''}</td>
            <td class="text-end">
                <div class="d-flex justify-content-end gap-1">
                    <button class="btn btn-info btn-sm text-white btn-view" title="Xem">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-warning btn-sm text-dark btn-edit" title="Sửa">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                </div>
            </td>
        `;

        // Bắt sự kiện trực tiếp cho nút Xem
        tr.querySelector(".btn-view").addEventListener("click", () => {
            openModal(student, "view");
        });

        // Bắt sự kiện trực tiếp cho nút Sửa
        tr.querySelector(".btn-edit").addEventListener("click", () => {
            openModal(student, "edit");
        });

        tbody.appendChild(tr);
    });
}

// 3. Hàm mở Modal
function openModal(student, mode) {
    if (!student) return;

    // Đổ dữ liệu vào Modal
    document.getElementById("modalStudentId").value = student.id || '';
    document.getElementById("modalStudentCode").value = student.studentCode || '';
document.getElementById("modalFullName").value = student.fullName || '';
    document.getElementById("modalEmail").value = student.email || '';
    document.getElementById("modalPhone").value = student.phone || '';
    document.getElementById("modalClassName").value = student.className || '';

    const inputs = document.querySelectorAll("#modalStudentForm input");
    const btnSave = document.getElementById("btnSaveModal");
    const modalTitle = document.getElementById("modalTitle");

    if (mode === "view") {
        modalTitle.innerText = "Chi tiết sinh viên";
        inputs.forEach(input => input.disabled = true);
        btnSave.style.display = "none";
    } else if (mode === "edit") {
        modalTitle.innerText = "Chỉnh sửa thông tin sinh viên";
        inputs.forEach(input => input.disabled = false);
        document.getElementById("modalStudentCode").disabled = true; // Khóa mã SV
        btnSave.style.display = "inline-block";
    }

    // Hiển thị Modal theo Bootstrap 5 hoặc mở thủ công nếu thiếu JS Bootstrap
    const modalElement = document.getElementById('studentModal');
    if (window.bootstrap && window.bootstrap.Modal) {
        const studentModal = bootstrap.Modal.getOrCreateInstance(modalElement);
        studentModal.show();
    } else {
        // Fallback hiển thị nếu thiếu thư viện Bootstrap JS
        modalElement.classList.add("show");
        modalElement.style.display = "block";
        document.body.classList.add("modal-open");
    }
}

// 4. Lưu dữ liệu cập nhật (PUT)
async function handleSaveStudent(event) {
    event.preventDefault();
    const id = document.getElementById("modalStudentId").value;

    const updatedData = {
        studentCode: document.getElementById("modalStudentCode").value,
        fullName: document.getElementById("modalFullName").value,
        email: document.getElementById("modalEmail").value,
        phone: document.getElementById("modalPhone").value,
        className: document.getElementById("modalClassName").value
    };

    try {
        const response = await fetch(`http://localhost:8080/api/students/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            alert("Cập nhật thành công!");
            closeModal();
            loadStudents();
        } else {
            alert("Cập nhật thất bại!");
        }
    } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error);
    }
}

// Hàm hỗ trợ đóng Modal
function closeModal() {
    const modalElement = document.getElementById('studentModal');
    if (window.bootstrap && window.bootstrap.Modal) {
        const instance = bootstrap.Modal.getInstance(modalElement);
        if (instance) instance.hide();
    } else {
        modalElement.classList.remove("show");
        modalElement.style.display = "none";
        document.body.classList.remove("modal-open");
    }
}