from django.core.management.base import BaseCommand
from lesson.models import Lesson, LessonSection, Quiz, QuizQuestion, QuizQuestionOption

class Command(BaseCommand):
    help = 'Seeds the database with French Revolution lesson data'

    def handle(self, *args, **options):
        # Clear existing data
        self.stdout.write('Clearing existing data...')
        Lesson.objects.all().delete()

        lessons = [
            {
                'name': 'The French Revolution',
                'description': 'Explore the dramatic events that transformed France and shaped modern Europe',
                'avatar_face_id': 'ba83c375-3720-44b8-a842-b0d188ecd099',
                'sections': [
                    {
                        'title': 'Causes of the Revolution',
                        'content': '''
## What Led to the French Revolution?

The French Revolution emerged from a complex set of social, political, and economic factors.

### Major Causes:
* **Social Inequality:** The Three Estates system divided society unfairly
* **Financial Crisis:** France faced massive debt from wars and royal spending
* **Enlightenment Ideas:** New philosophical ideas challenged traditional authority
* **Food Shortages:** Poor harvests led to hunger and social unrest

### The Three Estates:
1. First Estate: Clergy (1% of population)
2. Second Estate: Nobility (2% of population)
3. Third Estate: Everyone else (97% of population)

> "The nobility and clergy enjoyed privileges that set them apart from the rest of society, including exemption from most taxes."
'''
                    },
                    {
                        'title': 'Key Events (1789)',
                        'content': '''
## The Revolution Begins

### Timeline of 1789:
* **May 5:** Meeting of the Estates-General at Versailles
* **June 17:** Third Estate declares itself the National Assembly
* **June 20:** Tennis Court Oath - Members vow not to disperse until a constitution is written
* **July 14:** Storming of the Bastille
* **August 4:** Abolition of feudal privileges
* **August 26:** Declaration of the Rights of Man and of the Citizen
* **October 5-6:** Women's March on Versailles

### The Bastille
The storming of the Bastille became a powerful symbol of revolution, representing the end of the absolute monarchy and the birth of the sovereign Nation.
Key Facts about the Bastille:
- Originally built as a medieval fortress
- Served as a state prison
- Held only seven prisoners when stormed
- Symbolized royal authority and oppression

![Storming of the Bastille](https://example.com/bastille.jpg)
'''
                    },
                    {
                        'title': 'Revolutionary Changes',
                        'content': '''
## Transformation of French Society

### Major Reforms:
* Abolition of the monarchy and establishment of the First Republic
* Creation of a new political system based on citizenship and inalienable rights
* Reorganization of the Catholic Church in France
* Implementation of the metric system
* Reform of the education system

### New Symbols of France:
* Tricolor Flag (Blue, White, and Red)
* Marseillaise (National Anthem)
* Motto: "Liberty, Equality, Fraternity"

---

#### Impact on Modern France
The Revolution's principles continue to influence French society today:

1. **Secularism** (_laïcité_)
2. **Republican values**
3. **Centralized government**
4. **Educational system**

_"The French Revolution marked the beginning of modern democracy in Europe."_
'''
                    }
                ],
                'quizzes': [
                    {
                        'title': 'Causes and Background',
                        'questions': [
                            {
                                'question': 'What percentage of the French population belonged to the Third Estate?',
                                'options': [
                                    {'content': '97%', 'is_correct': True},
                                    {'content': '75%', 'is_correct': False},
                                    {'content': '50%', 'is_correct': False},
                                    {'content': '25%', 'is_correct': False}
                                ]
                            },
                            {
                                'question': 'Which of these was NOT a major cause of the French Revolution?',
                                'options': [
                                    {'content': 'Social inequality', 'is_correct': False},
                                    {'content': 'Financial crisis', 'is_correct': False},
                                    {'content': 'Industrial revolution', 'is_correct': True},
                                    {'content': 'Food shortages', 'is_correct': False}
                                ]
                            }
                        ]
                    },
                    {
                        'title': 'Key Events of 1789',
                        'questions': [
                            {
                                'question': 'What significant event occurred on July 14, 1789?',
                                'options': [
                                    {'content': 'The storming of the Bastille', 'is_correct': True},
                                    {'content': 'The Tennis Court Oath', 'is_correct': False},
                                    {'content': 'The Women\'s March on Versailles', 'is_correct': False},
                                    {'content': 'The meeting of the Estates-General', 'is_correct': False}
                                ]
                            },
                            {
                                'question': 'What was the Tennis Court Oath?',
                                'options': [
                                    {'content': 'A sports competition', 'is_correct': False},
                                    {'content': 'A vow not to disperse until a constitution was written', 'is_correct': True},
                                    {'content': 'A royal tennis tournament', 'is_correct': False},
                                    {'content': 'A pledge of loyalty to the king', 'is_correct': False}
                                ]
                            }
                        ]
                    },
                    {
                        'title': 'Revolutionary Changes and Legacy',
                        'questions': [
                            {
                                'question': 'What is the motto of France that emerged from the Revolution?',
                                'options': [
                                    {'content': 'Peace, Order, and Good Government', 'is_correct': False},
                                    {'content': 'Liberty, Equality, Fraternity', 'is_correct': True},
                                    {'content': 'Unity, Duty, Destiny', 'is_correct': False},
                                    {'content': 'Honor, Courage, Commitment', 'is_correct': False}
                                ]
                            },
                            {
                                'question': 'Which of these reforms was implemented during the French Revolution?',
                                'options': [
                                    {'content': 'Introduction of the Euro', 'is_correct': False},
                                    {'content': 'Creation of the United Nations', 'is_correct': False},
                                    {'content': 'Implementation of the metric system', 'is_correct': True},
                                    {'content': 'Establishment of the European Union', 'is_correct': False}
                                ]
                            }
                        ]
                    }
                ]
            }
        ]

        # Create lessons and related objects
        for lesson_data in lessons:
            lesson = Lesson.objects.create(
                name=lesson_data['name'],
                description=lesson_data['description'],
                avatar_face_id=lesson_data['avatar_face_id']
            )

            # Create sections
            for i, section_data in enumerate(lesson_data['sections']):
                LessonSection.objects.create(
                    lesson=lesson,
                    title=section_data['title'],
                    content=section_data['content'].strip(),
                    order=i
                )

            # Create quizzes
            for i, quiz_data in enumerate(lesson_data['quizzes']):
                quiz = Quiz.objects.create(
                    lesson=lesson,
                    title=quiz_data['title'],
                    order=i
                )

                # Create questions and options
                for j, question_data in enumerate(quiz_data['questions']):
                    question = QuizQuestion.objects.create(
                        quiz=quiz,
                        question=question_data['question'],
                        order=j
                    )

                    # Create options
                    for option_data in question_data['options']:
                        QuizQuestionOption.objects.create(
                            question=question,
                            content=option_data['content'],
                            is_correct=option_data['is_correct']
                        )

        self.stdout.write(self.style.SUCCESS('Successfully seeded database with French Revolution lesson'))