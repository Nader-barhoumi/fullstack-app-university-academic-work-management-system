import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { User } from '../users/entities/user.entity';
import { RoleType } from '../enums/RoleType.enum';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly repository: Repository<Student>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    // Check if user exists and has the correct role
    const user = await this.userRepository.findOneBy({
      id: createStudentDto.user_id,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${createStudentDto.user_id} not found`);
    }

    if (user.role !== RoleType.STUDENT) {
      throw new BadRequestException('User role must be set to STUDENT');
    }

    // Check if student record already exists for this user
    const existingStudent = await this.repository.findOneBy({
      user_id: createStudentDto.user_id,
    });

    if (existingStudent) {
      throw new ConflictException(`Student record already exists for user ID ${createStudentDto.user_id}`);
    }

    // Check if student ID is already in use
    const existingStudentId = await this.repository.findOneBy({
      student_id: createStudentDto.student_id,
    });

    if (existingStudentId) {
      throw new ConflictException(`Student with ID ${createStudentDto.student_id} already exists`);
    }

    const student = new Student();
    student.user_id = createStudentDto.user_id;
    student.sex = createStudentDto.sex;
    student.student_id = createStudentDto.student_id;
    student.degree = createStudentDto.degree;
    student.level = createStudentDto.level;

    return await this.repository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return await this.repository.find({
      relations: ['user', 'user.address'],
    });
  }

  async findOne(userId: number): Promise<Student | null> {
    return await this.repository.findOne({
      where: { user_id: userId },
      relations: ['user', 'user.address'],
    });
  }

  async findByStudentId(studentId: string): Promise<Student | null> {
    return await this.repository.findOne({
      where: { student_id: studentId },
      relations: ['user', 'user.address'],
    });
  }

  async update(userId: number, updateStudentDto: UpdateStudentDto): Promise<Student | null> {
    const student = await this.repository.findOne({ where: { user_id: userId } });
    
    if (!student) {
      throw new NotFoundException(`Student with user ID ${userId} not found`);
    }
    
    // Check for duplicate student ID
    if (updateStudentDto.student_id && updateStudentDto.student_id !== student.student_id) {
      const existingStudentId = await this.repository.findOneBy({ student_id: updateStudentDto.student_id });
      if (existingStudentId) {
        throw new ConflictException(`Student with ID ${updateStudentDto.student_id} already exists`);
      }
    }
    
    // Update fields
    if (updateStudentDto.sex !== undefined) student.sex = updateStudentDto.sex;
    if (updateStudentDto.student_id) student.student_id = updateStudentDto.student_id;
    if (updateStudentDto.degree) student.degree = updateStudentDto.degree;
    if (updateStudentDto.level) student.level = updateStudentDto.level;
    
    return await this.repository.save(student);
  }

  async remove(userId: number): Promise<boolean> {
    const student = await this.findOne(userId);
    if (!student) {
      return false;
    }
    await this.repository.remove(student);
    return true;
  }
}