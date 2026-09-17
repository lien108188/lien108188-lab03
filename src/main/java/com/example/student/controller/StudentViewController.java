package com.example.student.controller;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.student.entity.Student;
import com.example.student.repository.StudentRepository;

@Controller
@RequestMapping("/students")
public class StudentViewController {

    @Autowired
    private StudentRepository studentRepository;

    // Xem danh sách
    @GetMapping
    public String showStudentList(Model model) {
        model.addAttribute("students", studentRepository.findAll());
        model.addAttribute("newStudent", new Student());
        return "students";
    }

    // Thêm sinh viên
    @PostMapping("/add")
    public String addStudent(@ModelAttribute("newStudent") Student student) {
        studentRepository.save(student);
        return "redirect:/students";
    }

    // Mở form sửa sinh viên
    @GetMapping("/edit/{id}")
    public String editStudent(@PathVariable("id") UUID id, Model model) {
        Optional<Student> student = studentRepository.findById(id);
        if (student.isEmpty()) {
            return "redirect:/students";
        }
        model.addAttribute("student", student.get());
        return "student-edit";
    }

    // Cập nhật sinh viên
    @PostMapping("/update/{id}")
    public String updateStudent(@PathVariable("id") UUID id,
            @ModelAttribute("student") Student student) {
        Student existingStudent = studentRepository.findById(id).orElse(null);
        if (existingStudent == null) {
            return "redirect:/students";
        }

        existingStudent.setStudentCode(student.getStudentCode());
        existingStudent.setFullName(student.getFullName());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setPhone(student.getPhone());
        existingStudent.setClassName(student.getClassName());

        studentRepository.save(existingStudent);
        return "redirect:/students";
    }

    // Xóa sinh viên
    @GetMapping("/delete/{id}")
    public String deleteStudent(@PathVariable("id") UUID id) {
        studentRepository.deleteById(id);
        return "redirect:/students";
    }
}
