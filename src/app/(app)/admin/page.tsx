import PageHeader from '@/components/page-header';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getResources } from '@/lib/services/resources';
import { Resource } from '@/lib/models/resource';
import Link from 'next/link';

export default async function AdminPage() {
  let resources: Resource[] = [];
  try {
    resources = await getResources();
  } catch (error) {
    console.error("Failed to fetch resources for admin page:", error);
  }

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="View and manage application data."
      />
      <Card>
        <CardHeader>
          <CardTitle>Resource Hub Content</CardTitle>
        </CardHeader>
        <CardContent>
          {resources.length > 0 ? (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Subcategory</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>URL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.map((resource) => (
                    <TableRow key={resource._id?.toString()}>
                      <TableCell>{resource.category}</TableCell>
                      <TableCell>{resource.subcategory}</TableCell>
                      <TableCell className="font-medium">{resource.title}</TableCell>
                      <TableCell>{resource.source}</TableCell>
                      <TableCell>
                        <Link href={resource.url} target="_blank" className="text-primary hover:underline text-sm">
                          View Link
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
             <p className="text-muted-foreground">No resources found in the database or could not connect to the database.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
