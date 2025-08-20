import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowRight,
  CodeXml,
  Download,
  File,
  FileText,
  Layers,
  Terminal,
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    href: '/installation',
    icon: Download,
    title: 'Laravel Installation',
    description: 'Set up a new Laravel project with the necessary configurations.',
  },
  {
    href: '/crud',
    icon: Layers,
    title: 'CRUD Scaffolding',
    description: 'Quickly create Models, Views, and Controllers from templates.',
  },
  {
    href: '/forms',
    icon: FileText,
    title: 'Form Generation',
    description: 'Build interactive forms using simple configurations and data.',
  },
  {
    href: '/explain',
    icon: CodeXml,
    title: 'Code Explanation',
    description: 'Explain any piece of PHP code using AI and official docs.',
  },
  {
    href: '/terminal',
    icon: Terminal,
    title: 'Artisan Terminal',
    description: 'Access the command line to execute artisan commands.',
  },
  {
    href: '/files',
    icon: File,
    title: 'File Browser',
    description: 'Navigate through your Laravel project files and directories.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary font-headline">
              Welcome to Artisan Toolkit
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Your all-in-one solution for accelerating Laravel development.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link href={feature.href} key={feature.href} className="group">
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 hover:border-primary">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">
                      {feature.title}
                    </CardTitle>
                    <feature.icon className="w-6 h-6 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                  <div className="p-6 pt-0">
                     <div className="text-sm font-medium text-primary flex items-center group-hover:underline">
                      Go to tool <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
