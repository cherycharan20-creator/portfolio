/**
 * skillsapp.ts - Angular Component for Categorized Skills Matrix
 */
import { Component } from '@angular/core';

interface SkillGroup {
  name: string;
  skills: string[];
}

@Component({
  selector: 'app-skills',
  template: `
    <div class="p-6 glass-card rounded-3xl">
      <h3 class="text-2xl font-bold text-cyan-400 mb-6 font-mono">Technical Arsenal</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div *ngFor="let group of skillGroups" class="space-y-3">
          <h4 class="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono">
            {{ group.name }}
          </h4>
          <div class="flex flex-wrap gap-2">
            <span *ngFor="let skill of group.skills" class="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SkillsComponent {
  skillGroups: SkillGroup[] = [
    {
      name: 'Backend & APIs',
      skills: ['Python 3.x', 'FastAPI', 'Django', 'Flask', 'RESTful APIs', 'Microservices', 'GraphQL', 'WebSockets']
    },
    {
      name: 'AI / ML & Data Science',
      skills: ['Scikit-Learn', 'Random Forest', 'SVM', 'PyTorch', 'TensorFlow', 'LangChain', 'Pandas', 'NumPy']
    },
    {
      name: 'Frontend Development',
      skills: ['React.js', 'Angular', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5', 'CSS3']
    },
    {
      name: 'Databases & Storage',
      skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL Optimization', 'Database Normalization', 'SQLAlchemy']
    },
    {
      name: 'DevOps & Tooling',
      skills: ['Git', 'GitHub', 'Docker Basics', 'Postman', 'CI/CD Workflows', 'VS Code', 'Jupyter Notebook']
    }
  ];
}
