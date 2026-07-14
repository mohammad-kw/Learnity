# Learnity — Diagrams

Visual references for the system. Diagrams use **Mermaid** (renders on GitHub and in VS Code with a Mermaid extension).

---

## 1. System Context Diagram

```mermaid
graph TD
    U[User Browser] -->|HTTPS| FE[React Frontend<br/>Vercel]
    FE -->|REST /api/v1| BE[Express Backend<br/>Render]
    BE -->|Mongoose| DB[(MongoDB Atlas)]
    BE -->|Upload/Fetch| CL[Cloudinary]
    BE -->|SMTP| MAIL[Email Provider]
    BE -->|Orders/Verify| RP[Razorpay API]
    U -->|Checkout Widget| RP
```

---

## 2. Request Lifecycle (typical authenticated call)

```mermaid
sequenceDiagram
    participant C as React Component
    participant OP as services/operations
    participant AX as apiConnector (Axios)
    participant MW as auth middleware
    participant CT as Controller
    participant DB as MongoDB

    C->>OP: call feature function
    OP->>AX: apiConnector(method, url, body, token)
    AX->>MW: HTTP request + Bearer token
    MW->>MW: verify JWT + role
    MW->>CT: next()
    CT->>DB: query / mutate
    DB-->>CT: documents
    CT-->>AX: JSON response
    AX-->>OP: data
    OP->>C: dispatch redux + toast
```

---

## 3. Authentication / Signup Flow

```mermaid
flowchart TD
    A[User fills signup form] --> B[Request OTP]
    B --> C[Server generates OTP<br/>saves to DB + emails it]
    C --> D[User enters OTP + details]
    D --> E{OTP valid?}
    E -->|No| D
    E -->|Yes| F[Hash password with bcrypt]
    F --> G[Create User + Profile]
    G --> H[Redirect to Login]
    H --> I[Login -> issue JWT]
    I --> J[Store token in Redux + localStorage]
```

---

## 4. Payment / Enrollment Flow

```mermaid
flowchart TD
    A[Student clicks Buy] --> B{Free course?}
    B -->|Yes| C[enrollCourseFree]
    C --> Z[Enrolled + success email]
    B -->|No| D[capturePayment -> create Razorpay order]
    D --> E[Open Razorpay Checkout]
    E --> F{Payment success?}
    F -->|No| G[Show error toast]
    F -->|Yes| H[verifyPayment -> check signature]
    H --> I[Enroll student in course]
    I --> Z2[Payment success email]
```

---

## 5. Entity Relationship Diagram

```mermaid
erDiagram
    USER ||--|| PROFILE : has
    USER ||--o{ COURSE : "creates (instructor)"
    USER }o--o{ COURSE : "enrolled (student)"
    COURSE ||--o{ SECTION : contains
    SECTION ||--o{ SUBSECTION : contains
    COURSE ||--o{ RATINGANDREVIEW : has
    USER ||--o{ RATINGANDREVIEW : writes
    COURSE ||--o{ COURSEPROGRESS : "tracked by"
    USER ||--o{ COURSEPROGRESS : owns
    CATEGORY ||--o{ COURSE : groups
    USER ||--o{ OTP : "verifies with"
    CONTACTMESSAGE }o--|| USER : "optional sender"

    USER {
        string firstName
        string lastName
        string email
        string password
        string accountType
        ref profile
        array courses
    }
    COURSE {
        string courseName
        string courseDescription
        ref instructor
        number price
        ref category
        array courseContent
        array studentsEnrolled
        string status
    }
    SECTION {
        string sectionName
        array subSection
    }
    SUBSECTION {
        string title
        string timeDuration
        string videoUrl
    }
```

---

## 6. Frontend State (Redux) Map

```mermaid
graph LR
    Store --> auth[authSlice<br/>token, signupData, loading]
    Store --> profile[profileSlice<br/>user]
    Store --> cart[cartSlice<br/>cart, total, totalItems]
    Store --> course[courseSlice<br/>course, step, editMode]
    Store --> viewCourse[viewCourseSlice<br/>courseSectionData, completedLectures]
```

---

## 7. Deployment Topology

```mermaid
graph TD
    subgraph Client
        V[Vercel<br/>React static build]
    end
    subgraph Server
        R[Render Web Service<br/>Express + Node]
    end
    subgraph Data
        M[(MongoDB Atlas)]
    end
    subgraph Services
        CL[Cloudinary]
        RP[Razorpay]
        SM[SMTP Mail]
    end

    V -->|REACT_APP_BASE_URL| R
    R --> M
    R --> CL
    R --> RP
    R --> SM
    V -->|REACT_APP_RAZORPAY_KEY| RP
```

---

## 8. Media Storage Decision

```mermaid
flowchart TD
    A[File upload request] --> B{STORAGE env}
    B -->|local| C[Save to server/uploads]
    C --> D[Serve via /uploads static route]
    B -->|cloudinary| E[Upload to Cloudinary]
    E --> F[Store secure_url in DB]
```
