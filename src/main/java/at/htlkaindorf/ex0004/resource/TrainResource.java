package at.htlkaindorf.ex0004.resource;

import at.htlkaindorf.ex0004.database.TrainDatabase;
import at.htlkaindorf.ex0004.pojo.Train;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import lombok.Getter;

import javax.management.openmbean.KeyAlreadyExistsException;
import java.net.URI;
import java.util.List;

@Path("/trains")
public class TrainResource {
    @GET
    @Produces("application/json")
    public List<Train> getTrains() {
        return TrainDatabase.getInstance().getTrains();
    }

    @GET
    @Path("/{id}")
    @Produces("application/json")
    public Train getTrain(@PathParam("id") int id) {
        Train train = TrainDatabase.getInstance().getById(id);
        if (train == null) {
            throw new NotFoundException("Id not found");
        }
        return train;
    }

    @POST
    @Consumes("application/json")
    public Response addTrain(Train train) {
        try {
            TrainDatabase.getInstance().addTrain(train);

            return Response.created(URI.create("trains/" + train.getId()))
                    .entity(train)
                    .build();
        } catch (KeyAlreadyExistsException ex) {
            return Response.status(Response.Status.CONFLICT).build();
        }
    }

    @POST
    @Path("/{id}")
    public Response addTrainStation(@PathParam("id") int id, @QueryParam("station") String station) {
        TrainDatabase.getInstance().addStation(id, station);
        return Response.ok().build();
    }
}