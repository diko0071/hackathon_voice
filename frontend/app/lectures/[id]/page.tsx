import StudentWizardFlow from "@/app/modules/students/pages/students-page"

export default function LecturePage({ params }: { params: { id: string } }) {
  return <StudentWizardFlow lectureId={params.id} />
}
