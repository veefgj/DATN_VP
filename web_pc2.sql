-- create database
DROP DATABASE IF EXISTS TestingSystem;
CREATE DATABASE TestingSystem;
USE TestingSystem;

-- create table : Address
DROP TABLE IF EXISTS Address;
CREATE TABLE Address(
	AddressID 				TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    AddressName 			NVARCHAR(100) NOT NULL UNIQUE KEY
);

-- create table: Department
DROP TABLE IF EXISTS Department;
CREATE TABLE Department(
	DepartmentID 			TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    DepartmentName 			NVARCHAR(30) NOT NULL UNIQUE KEY
);

-- create table : Detail Department
DROP TABLE IF EXISTS DetailDepartment;
CREATE TABLE DetailDepartment(
	DepartmentID 			TINYINT UNSIGNED PRIMARY KEY,
    AddressID 				TINYINT UNSIGNED, -- UNIQUE KEY,  -- NOT NULL ,
    EmulationPoint 			TINYINT UNSIGNED,
    FOREIGN KEY(DepartmentID) REFERENCES Department(DepartmentID),
	FOREIGN KEY(AddressID) REFERENCES Address(AddressID)
);

-- create table: Posittion
DROP TABLE IF EXISTS Position;
CREATE TABLE `Position` (
	PositionID				TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    PositionName			ENUM('Dev','Test','ScrumMaster','PM') NOT NULL UNIQUE KEY
);

-- create table: Salary
DROP TABLE IF EXISTS Salary;
CREATE TABLE `Salary` (
	SalaryID			TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    SalaryName			ENUM('600','700','1500','2000') NOT NULL UNIQUE KEY -- 600: Dev, Test: 700, Scrum Master: 1500, PM: 2000
);

-- create table: Account
DROP TABLE IF EXISTS `Account`;
CREATE TABLE `Account`(
	AccountID				TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Email					VARCHAR(50) NOT NULL UNIQUE KEY, -- Cannot update this field
    Username				VARCHAR(50) NOT NULL UNIQUE KEY, -- Cannot update this field
    FirstName				NVARCHAR(50) NOT NULL,
    LastName				NVARCHAR(50) NOT NULL,	-- create field fullName in POJO
    DepartmentID 			TINYINT UNSIGNED NOT NULL,	-- Set default waiting
    PositionID				TINYINT UNSIGNED NOT NULL,	-- Set default Dev
    SalaryID				TINYINT UNSIGNED NOT NULL, -- Set default 600
    CreateDate				DATETIME DEFAULT NOW(), -- Cannot update this field
    FOREIGN KEY(DepartmentID) REFERENCES Department(DepartmentID),
    FOREIGN KEY(PositionID) REFERENCES `Position`(PositionID),
    FOREIGN KEY(SalaryID) REFERENCES `Salary`(SalaryID)
);

-- create table: Employee
DROP TABLE IF EXISTS `Employee`;
CREATE TABLE `Employee`(
	AccountID				TINYINT UNSIGNED PRIMARY KEY,
	WorkingNumberOfYear		TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY(AccountID) REFERENCES `Account` (AccountID)
);

-- create table: Manager
DROP TABLE IF EXISTS `Manager`;
CREATE TABLE `Manager`(
	AccountID					TINYINT UNSIGNED PRIMARY KEY,
    ManagementNumberOfYear 		TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY(AccountID) REFERENCES `Account` (AccountID)
);

-- create table: Group
DROP TABLE IF EXISTS `Group`;
CREATE TABLE `Group`(
	GroupID					TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    GroupName				NVARCHAR(50) NOT NULL UNIQUE KEY,
    CreatorID				TINYINT UNSIGNED NOT NULL, -- Cannot update this field
    CreateDate				DATETIME DEFAULT NOW(), -- Cannot update this field
	FOREIGN KEY(CreatorID) REFERENCES `Account` (AccountID)
);

-- create table: GroupAccount
DROP TABLE IF EXISTS GroupAccount;
CREATE TABLE GroupAccount(
	GroupID					TINYINT UNSIGNED NOT NULL,
    AccountID				TINYINT UNSIGNED NOT NULL,
    JoinDate				DATETIME DEFAULT NOW(),
    PRIMARY KEY (GroupID,AccountID),
    FOREIGN KEY(AccountID) REFERENCES `Account` (AccountID),
    FOREIGN KEY(GroupID) REFERENCES `Group` (GroupID)
);

-- create table: TypeQuestion
DROP TABLE IF EXISTS TypeQuestion;
CREATE TABLE TypeQuestion (
    TypeID 			TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    TypeName 		ENUM('0','1') NOT NULL UNIQUE KEY -- 0:  Esay, 1: Multiple-Choice
);

-- create table: CategoryQuestion
DROP TABLE IF EXISTS CategoryQuestion;
CREATE TABLE CategoryQuestion(
    CategoryID				TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    CategoryName			NVARCHAR(50) NOT NULL UNIQUE KEY
);

-- create table: Question
DROP TABLE IF EXISTS Question;
CREATE TABLE Question(
    QuestionID				TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Content					NVARCHAR(100) NOT NULL,
    CategoryID				TINYINT UNSIGNED NOT NULL,
    TypeID					TINYINT UNSIGNED NOT NULL,
    CreatorID				TINYINT UNSIGNED NOT NULL UNIQUE KEY, -- Cannot update this field
    CreateDate				DATETIME DEFAULT NOW(), -- Cannot update this field
    FOREIGN KEY(CategoryID) 	REFERENCES CategoryQuestion(CategoryID),
    FOREIGN KEY(TypeID) 		REFERENCES TypeQuestion(TypeID),
    FOREIGN KEY(CreatorID) 		REFERENCES `Account`(AccountId)
);

-- create table: Answer
DROP TABLE IF EXISTS Answer;
CREATE TABLE Answer(
    Answers					TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Content					NVARCHAR(100) NOT NULL,
    QuestionID				TINYINT UNSIGNED NOT NULL,
    isCorrect				BIT DEFAULT 1,
    FOREIGN KEY(QuestionID) REFERENCES Question(QuestionID)
);

-- create table: Exam
DROP TABLE IF EXISTS Exam;
CREATE TABLE Exam(
    ExamID					TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `Code`					CHAR(10) NOT NULL,	-- L-1: if duration >= 180p, M-1: if duration >= 90p, S-1: otherwise -- Cannot update this field
    Title					NVARCHAR(50) NOT NULL,
    CategoryID				TINYINT UNSIGNED NOT NULL,
    Duration				TINYINT UNSIGNED NOT NULL DEFAULT 45,
    CreatorID				TINYINT UNSIGNED NOT NULL, -- Cannot update this field
    CreateDate				DATETIME DEFAULT NOW(), -- Cannot update this field
    FOREIGN KEY(CategoryID) REFERENCES CategoryQuestion(CategoryID),
    FOREIGN KEY(CreatorID) 	REFERENCES `Account`(AccountId)
);

-- create table: ExamQuestion
DROP TABLE IF EXISTS ExamQuestion;
CREATE TABLE ExamQuestion(
    ExamID				TINYINT UNSIGNED NOT NULL,
	QuestionID			TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY(QuestionID) REFERENCES Question(QuestionID),
    FOREIGN KEY(ExamID) REFERENCES Exam(ExamID),
    PRIMARY KEY (ExamID,QuestionID)
);