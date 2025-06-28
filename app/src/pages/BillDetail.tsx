import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

export default function Home() {
  const iconUrl = '/assets/app-icon.png' // Make sure this is in your public/assets folder

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Icon */}
      <div className="flex justify-center">
        <img
          src={iconUrl}
          alt="App Icon"
          className="w-20 h-20 rounded-full border shadow-sm object-cover"
          loading="lazy"
        />
      </div>

      <Card className="p-6 space-y-4">
        <h1 className="text-3xl font-extrabold text-center">Your Voice, Amplified</h1>

        <p className="text-gray-700 leading-relaxed">
          It can feel like our voices get lost in the noise — like real change is out of reach.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Our platform bridges the gap between you and the people who make decisions — making sure your voice is heard loud and clear.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Simply search an issue you care about to see bills actively being considered at all levels of government. We simplify the details and show you the main points for and against each bill.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Not sure which side to take? Chat with our assistant to understand the perspectives.
        </p>

        <p className="text-gray-700 leading-relaxed">
          We also provide personalized call and email scripts so you can contact your representatives directly — no guesswork, just action.
        </p>

        <p className="text-gray-700 leading-relaxed">
          If there isn’t a bill for your issue yet, you’ll still get the tools to make your voice heard.
        </p>

        <div className="flex justify-center pt-4">
          <Button asChild>
            <Link to="/">Start Exploring</Link>
          </Button>
        </div>
      </Card>
    </main>
  )
}
