import React, { useEffect, useState } from 'react'
import './App.scss'
import { Button, Layout, Space, Image, Spin } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import getPosts, { getMedias } from './services/wordpressApi'
import MasonryGrid from './components/MasonryGrid'


function App() {
  const ALL = 0
  const [photos, setPhotos] = useState([])
  const [selectedFilter, setSelectedFilter] = useState(0)
  const [filters, setFilters] = useState([])
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)

  const setFilter = (id: number) => {
    setSelectedFilter(id)
    setGallery([])

    const photosFiltered = id === ALL
      ? photos
      : photos.filter((photo: any) => photo.post === id)

    setTimeout(() => setGallery(photosFiltered), 100)
  }


  const getPostData = async () => {
    setLoading(true)

    let filtersMapped = [{ id: 0, name: 'Tudo' }] as any
    let imagesIds: number[] = []

    try {
      const { data: posts }: any = await getPosts(10)
      posts.forEach((item: any) => {
        const { id, title: { rendered: name }, galeria }: any = item
        filtersMapped.push({ id, name })
        galeria.map((image: any) => imagesIds.push(image.ID))
      })

      const { data: images }: any = await getMedias(`include=${imagesIds.join(',')}`)

      setPhotos(images)
      setGallery(images)
      setFilters(filtersMapped)

    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    getPostData()
  }, [])

  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        <Space>
          {
            filters.map((item: any) => (
              <Button
                ghost
                type={selectedFilter === item.id ? 'primary' : 'default'}
                onClick={() => setFilter(item.id)}
                key={item.id}>
                {item.name}
              </Button>)
            )
          }
        </Space>
        <hr />
        {loading && <Spin size='large' />}
        <MasonryGrid columns={3} gap={5}>
          {gallery.map((image: any) => (

            <Image
              className="Teste"
              src={image.media_details.sizes.large.source_url}
              preview={{
                src: image.media_details.sizes.full.source_url,
              }}
            />
          ))}
        </MasonryGrid>
      </Content>
    </Layout>
  )
}

export default App
