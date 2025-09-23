# Phoenix LiveView: Multi-User Cursor Tracking Guide (with Presence)

This guide will walk you through creating a Phoenix LiveView app that tracks and displays the cursors of all connected users in real time, using Phoenix Presence.

---

## 1. Install Phoenix

If you haven't already:

```bash
mix archive.install hex phx_new
```

---

## 2. Create a New Phoenix Project

We'll create a project (no database needed).

```bash
mix phx.new demo_phoenix --live --no-ecto
```

---

## 3. Move Into the Project Directory

```bash
cd demo_phoenix
```

---

## 4. Install Dependencies

```bash
mix deps.get
```

---

## 5. Set Up Phoenix Presence

Create `lib/demo_phoenix_web/presence.ex`:

```elixir
defmodule DemoPhoenixWeb.Presence do
  @moduledoc """
  Provides presence tracking to channels and live views.
  """
  use Phoenix.Presence,
    otp_app: :demo_phoenix,
    pubsub_server: DemoPhoenix.PubSub
end
```

---

## 6. Add Presence to Your Application Supervisor

Open `lib/demo_phoenix/application.ex` and add **Presence** to the `children` list in the `start/2` function:

```elixir
children = [
  DemoPhoenixWeb.Telemetry,
  {Phoenix.PubSub, name: DemoPhoenix.PubSub},
  DemoPhoenixWeb.Endpoint,
  DemoPhoenixWeb.Presence            # <-- add this line
]
```

---

## 7. Create the Tracker LiveView

Create `lib/demo_phoenix_web/tracker_live.ex`:

```elixir
defmodule DemoPhoenixWeb.TrackerLive do
  use DemoPhoenixWeb, :live_view
  alias DemoPhoenixWeb.Presence

  @topic "live_cursors"

  def mount(_params, _session, socket) do
    if connected?(socket) do
      Phoenix.PubSub.subscribe(DemoPhoenix.PubSub, @topic)
      Presence.track(self(), @topic, socket.id, %{x: 0, y: 0})
    end

    presences = Presence.list(@topic)

    socket =
      assign(socket,
        page_title: "Live Cursor Tracking",
        presences: presences
      )

    {:ok, socket}
  end

  def render(assigns) do
    ~H"""
    <div
      id="tracker"
      phx-hook="CursorTracker"
      class="relative w-full h-screen bg-gray-100 overflow-hidden"
    >
      <%= for {user_id, %{metas: [meta | _]}} <- @presences do %>
        <div
          id={"user-#{user_id}"}
          class="absolute text-blue-500 pointer-events-none"
          style={"left: #{meta.x}px; top: #{meta.y}px;"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
            />
          </svg>
          <span class="ml-2 bg-white rounded-full px-2 py-1 text-sm">{user_id}</span>
        </div>
      <% end %>
    </div>
    """
  end

  # Handle mouse movement from the client
  def handle_event("move", %{"client_x" => x, "client_y" => y}, socket) do
    Presence.update(self(), @topic, socket.id, %{x: x, y: y})
    {:noreply, socket}
  end

  # Handle user leaving the window
  def handle_event("leave", _, socket) do
    Presence.untrack(self(), @topic, socket.id)
    {:noreply, socket}
  end

  # Handle presence updates from other users
  def handle_info(%{event: "presence_diff", payload: _payload}, socket) do
    socket = assign(socket, presences: Presence.list(@topic))
    {:noreply, socket}
  end
end
```

---

## 8. Add the LiveView Route

Open `lib/demo_phoenix_web/router.ex` and in the main scope (`scope "/", DemoPhoenixWeb do`), add:

```elixir
live "/tracker", TrackerLive
```

---

## 9. Add the Javascript Hook

Open `assets/js/app.js` and add the `CursorTracker` hook to the `Hooks` object.

```javascript
let Hooks = {}

Hooks.CursorTracker = {
  mounted() {
    // Dispatch mouse move event to LiveView
    this.mouseMoveHandler = (e) => {
      this.pushEvent("move", {
        client_x: e.clientX,
        client_y: e.clientY
      })
    }
    this.mouseLeaveHandler = (e) => {
      this.pushEvent("leave", {})
    }

    this.el.addEventListener("mousemove", this.mouseMoveHandler)
    this.el.addEventListener("mouseleave", this.mouseLeaveHandler)
  },
  destroyed() {
    this.el.removeEventListener("mousemove", this.mouseMoveHandler)
    this.el.removeEventListener("mouseleave", this.mouseLeaveHandler)
  }
}

// ... inside the new LiveSocket call
const liveSocket = new LiveSocket("/live", Socket, {
  // ...
  hooks: {...colocatedHooks, ...Hooks},
})
```

---

## 10. Run the Server and See the Demo

```bash
mix phx.server
```

Navigate to [http://localhost:4000/tracker](http://localhost:4000/tracker) in two different browser windows or tabs.

