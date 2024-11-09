// Dynamic Resume Builder - Handles form submission and display
class DynamicResumeBuilder {
    private readonly formArea: HTMLElement;
    private readonly outputArea: HTMLElement;
    private readonly inputFields: { [key: string]: HTMLInputElement };
    private readonly outputFields: { [key: string]: HTMLElement };

    constructor() {
        this.formArea = document.getElementById('formArea') as HTMLElement;
        this.outputArea = document.getElementById('output') as HTMLElement;
        
        // Initialize input fields
        this.inputFields = {
            name: document.getElementById('name') as HTMLInputElement,
            email: document.getElementById('email') as HTMLInputElement,
            phone: document.getElementById('phone') as HTMLInputElement,
            photo: document.getElementById('photo') as HTMLInputElement,
            schoolName: document.getElementById('school-name') as HTMLInputElement,
            degree: document.getElementById('degree') as HTMLInputElement,
            schoolName1: document.getElementById('school-name1') as HTMLInputElement,
            degree1: document.getElementById('degree1') as HTMLInputElement,
            insName: document.getElementById('ins-name') as HTMLInputElement,
            insRole: document.getElementById('ins-role') as HTMLInputElement,
            insName1: document.getElementById('ins-name1') as HTMLInputElement,
            insRole1: document.getElementById('ins-role1') as HTMLInputElement,
            skills: document.getElementById('skills-name') as HTMLInputElement,
            skills1: document.getElementById('skills-name1') as HTMLInputElement,
            projects: document.getElementById('projects-name') as HTMLInputElement
        };

        // Initialize output fields
        this.outputFields = {
            name: document.getElementById('outputName') as HTMLElement,
            email: document.getElementById('outputEmail') as HTMLElement,
            phone: document.getElementById('outputPhone') as HTMLElement,
            photo: document.getElementById('photoDisplay') as HTMLElement,
            schoolName: document.getElementById('outputSchool') as HTMLElement,
            degree: document.getElementById('outputDegree') as HTMLElement,
            schoolName1: document.getElementById('outputSchool1') as HTMLElement,
            degree1: document.getElementById('outputDegree1') as HTMLElement,
            insName: document.getElementById('outputIns') as HTMLElement,
            insRole: document.getElementById('outputRole') as HTMLElement,
            insName1: document.getElementById('outputIns1') as HTMLElement,
            insRole1: document.getElementById('outputRole1') as HTMLElement,
            skills: document.getElementById('outputSkills') as HTMLElement,
            skills1: document.getElementById('outputSkills1') as HTMLElement,
            projects: document.getElementById('outputProjects') as HTMLElement
        };

        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        const submitBtn = document.getElementById('submitBtn') as HTMLElement;
        submitBtn.addEventListener('click', () => this.handleSubmit());

        // Handle photo upload preview
        this.inputFields.photo.addEventListener('change', (e) => this.handlePhotoUpload(e));
    }

    private handleSubmit(): void {
        // Hide form and show output
        this.formArea.style.display = 'none';
        this.outputArea.style.display = 'block';

        // Update all text fields
        this.updateAllFields();
    }

    private updateAllFields(): void {
        // Update basic information
        this.outputFields.name.textContent = this.inputFields.name.value;
        this.outputFields.email.textContent = this.inputFields.email.value;
        this.outputFields.phone.textContent = this.inputFields.phone.value;

        // Update education
        this.outputFields.schoolName.textContent = this.inputFields.schoolName.value;
        this.outputFields.degree.textContent = this.inputFields.degree.value;
        this.outputFields.schoolName1.textContent = this.inputFields.schoolName1.value;
        this.outputFields.degree1.textContent = this.inputFields.degree1.value;

        // Update experience
        this.outputFields.insName.textContent = this.inputFields.insName.value;
        this.outputFields.insRole.textContent = this.inputFields.insRole.value;
        this.outputFields.insName1.textContent = this.inputFields.insName1.value;
        this.outputFields.insRole1.textContent = this.inputFields.insRole1.value;

        // Update skills and projects
        this.outputFields.skills.textContent = this.inputFields.skills.value;
        this.outputFields.skills1.textContent = this.inputFields.skills1.value;
        this.outputFields.projects.textContent = this.inputFields.projects.value;
    }

    private handlePhotoUpload(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const reader = new FileReader();
            
            reader.onload = (e) => {
                if (e.target?.result) {
                    this.outputFields.photo.innerHTML = `
                        <img src="${e.target.result}" 
                             alt="Profile Photo" 
                             style="width: 150px; height: 150px; border-radius: 50%; 
                                    border: 2px solid #4a90e2; object-fit: cover; 
                                    margin-bottom: 20px;">
                    `;
                }
            };

            reader.readAsDataURL(file);
        } else {
            this.outputFields.photo.innerHTML = "<p>No photo uploaded</p>";
        }
    }

    // Helper method to validate inputs
    private validateInputs(): boolean {
        const requiredFields = ['name', 'email', 'phone'];
        for (const field of requiredFields) {
            if (!this.inputFields[field].value.trim()) {
                alert(`Please fill in your ${field}`);
                return false;
            }
        }
        
        // Basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(this.inputFields.email.value)) {
            alert('Please enter a valid email address');
            return false;
        }

        return true;
    }

    // Method to reset the form
    public resetForm(): void {
        Object.values(this.inputFields).forEach(input => {
            input.value = '';
        });
        this.outputFields.photo.innerHTML = "<p>No photo uploaded</p>";
    }
}

// Initialize the resume builder
const resumeBuilder = new DynamicResumeBuilder();